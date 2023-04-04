import React from 'react'
import PocketBase from 'pocketbase';

const Hash = () => {
    return (
        <div>Hash</div>
    )
}

export default Hash

export async function getServerSideProps(context) {
    const pb = new PocketBase('https://api-url-shortner.techsapien.dev');
    const hashValue = context.params.hash;
    console.log(hashValue)
    let link = "/"

    const data = await pb.collection('url').getFirstListItem(`hash="${hashValue}"`)

    if (data) {
        // context.res.setHeader("Location", data.url);
        link = data.url

        return {
            props: {},
            redirect: {
                destination: link,
                permanent: false,
            }
        }
    }


}