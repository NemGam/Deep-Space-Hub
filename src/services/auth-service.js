const supabase = globalThis._supabaseClient;

const getSession = async () => {
    
    return supabase.auth.session();
}



export default {
    getSession
}