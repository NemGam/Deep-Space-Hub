import { createClient } from '@supabase/supabase-js'

const KEY = import.meta.env.VITE_PUBLIC_KEY;
const DB_URL = import.meta.env.VITE_SUPABASE_URL;


if (!KEY) console.error("KEY IS REQUIRED!");
if (!DB_URL) console.error("DB_URL IS REQUIRED!");



if (!globalThis._supabaseClient)
{
    console.log("Creating a new Supabase client...");
    globalThis._supabaseClient = createClient(DB_URL, KEY);
}

const supabase = globalThis._supabaseClient;

const signUp = async (username, email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options:{
            data:{
                username: username
            }
        }
        
    })

    if (error)
    {
        console.error('Error signing up:', error.message)
        return null;
    }
    else
    {
        console.log('Sign-up successful:', data);
        const user = data.user;

        const { error: err } = await supabase.from('profiles').insert({ user_id: user.id, username: username });

        if (err)
        {
            console.error(err);
            return null;
        }
        else
        {
            console.log("USER SUCCESSFULLY SIGNED UP! Welcome aboard " + username + " !");
            return data;
        }
    }
}

const logIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error)
    {
        console.error('Error signing in:', error.message)
        return null;
    }
    else
    {
        console.log('Sign-in successful:', data);
        return data;
    }
}

const getPosts = async () => {
    const { data, error } = await supabase.from('posts_view').select('post_id, created_at, title, gravity, username');
    if (error) console.error(error);
    return data;
}

const getFullPost = async (id) => {
    const { data, error } = await supabase.from('posts_view').select().eq('post_id', id).single();

    if (error) console.error(error);
    return data;
}

const updateGravity = async (id, gravity) => {
    const { error } = await supabase.from('posts').update({ gravity: gravity }).eq('id', id);
    if (error) console.error(error);
}

const createPost = async (title, content, img_url, authorIdId) => {
    const { error } = await supabase.from('posts').insert({ title: title, content: content, img_url: img_url, authorId: authorId });
    if (error)
    {
        console.error(error);
        return false;
    }
    return true;
}

const updatePost = async (id, title, content, img_url) => {
    const { error } = await supabase.from('posts').update({ title: title, content: content, img_url: img_url }).eq('id', id);
    if (error) console.error(error);
}

const deletePost = async (id) => {
    const response = await supabase.from('posts').delete().eq('id', id);
    console.log(response);
    return response;
}

const getComments = async (postId) => {
    const { data, error } = await supabase.from('Comments').select().eq('parent_post', postId);
    if (error) console.error(error);
    return data;
}

const createComment = async (postId, content, authorId) => {
    const { error } = await supabase.from('Comments').insert({ parent_post: postId, authorId: authorId, content: content });
    if (error) console.error(error);
}

//Fetches the profile by id of authenticated user
const fetchProfile = async (username) => {
    try
    {
        const { data, error } = await supabase.from('public_profiles').select().eq('username', username).single();
        if (error) throw new Error(error);
        return {data: data};
    }
    catch (err)
    {
        if (err.code === "PGRST116")
        {
            return {error: "No users found" };
        }
    }
}

const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
}

const changeProfilePicture = async ({userId, newUrl}) => {
    const { error } = await supabase.from('profiles').update({ profile_picture: newUrl }).eq('user_id', userId);
    if (error) console.error(error);
}

export default {
    getPosts, 
    createPost, 
    getFullPost, 
    updatePost, 
    deletePost, 
    updateGravity, 
    getComments, 
    createComment, 
    signUp, 
    logIn,
    fetchProfile, 
    logOut,
    changeProfilePicture
}