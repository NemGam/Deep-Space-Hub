import { createClient } from '@supabase/supabase-js'

const KEY = import.meta.env.VITE_PUBLIC_KEY;
const DB_URL = import.meta.env.VITE_SUPABASE_URL;


if (!KEY) console.error("KEY IS REQUIRED!");
if (!DB_URL) console.error("DB_URL IS REQUIRED!");


let supabase;

if (!supabase){
    supabase = createClient(DB_URL, KEY);
    console.log("Connection created");
}

const getPosts = async () => {
    const {data, error} = await supabase.from('Posts').select('id, created_at, title, gravity');
    if (error) console.error(error);
    return data;
}

const getFullPost = async(id) => {
    const {data, error} = await supabase.from('Posts').select('*').eq('id', id);

    if (error) console.error(error);
    return data;
}

const updateGravity = async(id, gravity) => {
    const {error} = await supabase.from('Posts').update({gravity: gravity}).eq('id', id);
    if (error) console.error(error);
}

const createPost = async (title, content, img_url) => {
    const { error } = await supabase.from('Posts').insert({title: title, content: content, img_url: img_url });
    if (error) console.error(error);
}

const getComments = async (postId) => {
    const {data, error} = await supabase.from('Comments').select().eq('parent_post', postId);
    if (error) console.error(error);
    return data;
}

const createComment = async(postId, content) => {
    const { error } = await supabase.from('Comments').insert({parent_post: postId, author: 1, content: content });
    if (error) console.error(error);
}


export default{
    getPosts, createPost, getFullPost, updateGravity, getComments, createComment
}