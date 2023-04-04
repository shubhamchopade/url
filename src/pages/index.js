import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import PocketBase from 'pocketbase';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {
  const [url, setUrl] = useState('');
  const [hash, setHash] = useState('');

  const [generatedUrl, setGeneratedUrl] = useState('');
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_API_KEY);

  return (
    <div>
      <h1>URL Shortner</h1>
      <label htmlFor="url">URL</label>
      <input name='url' value={url} onChange={e => setUrl(e.target.value)} />
      <label htmlFor="hash">HASH</label>
      <input name='hash' value={hash} onChange={e => setHash(e.target.value)} />
      <button onClick={async () => {
        try {
          const data = await pb.collection('url').create({ url, hash })
          setUrl('')
          setHash('')
          setGeneratedUrl(data.hash)
          console.log(data)
        } catch (e) {
          console.log(e)
        }
      }}>Shorten</button>
      {generatedUrl && <div>Generated URL: <a href={`/${generatedUrl}`}>{`/${generatedUrl}`}</a></div>}
    </div>
  )
}