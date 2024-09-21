import envConfig from "@/src/config/envConfig"



export const getRecentPosts = async () => {

    const fetchOptions={
        next:{
            tags:['posts']
        }
    }


    const res = await fetch(`${envConfig.baseApi}/items?sortBy=-createdAt&limit=9`,fetchOptions);
    
  
    return res.json();

}

