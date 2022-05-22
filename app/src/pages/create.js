/* eslint-disable no-undef */
import React, { useContext } from 'react'
import './create.css'
import { GlobalState } from '../GlobalState'
import { ToastContainer, toast } from "react-toastify";
import { v4 } from 'uuid';
import "react-toastify/dist/ReactToastify.css";
import { DatabaseService, StorageService } from '../adaptors/firebase';
import { limit, orderBy, query } from 'firebase/firestore';

const Create = () => {
    const [globalState] = useContext(GlobalState)
    const [state, setState] = React.useState({
        title: '',
        description: '',
        price: '',
        image: '',
        token_id: 0,
        isNew: true,
    })
    const [file, setFile] = React.useState(null)

    const handleChange = (e) => {
        e.stopPropagation();
        setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    const handleSubmit = async (e) => {
        e.stopPropagation();
        if (typeof window.ethereum !== 'undefined') {

        }
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        var downloadUrl = await toast.promise(
            StorageService.upload(`nfts/${v4()}`, [
                file
            ]),
            {
                pending: "Uploading Files To IPFS",
                success: "Upload Complete",
                error: "Upload rejected 🤯",
            }
        );
        var nft = await DatabaseService.get({
            col: "nfts",
            query: (ref) => {
                return query(ref, orderBy("token_id", "desc"), limit(1))
            }
        })
        var id = nft[0]?.token_id ?? 0

        await toast.promise(
            DatabaseService.set("nfts", {
                ...state,
                token_id: id + 1,
                creator: account,
                owner:  account,
                image: downloadUrl[0],
            }),
            {
                pending: "Uploading Data to BlockChain",
                success: "Upload Complete",
                error: "Upload rejected 🤯",
            }
        );

    }


    const handleFile = (e) => {
        e.stopPropagation();
        setFile(e.currentTarget.files[0])
    }
    return (
        <div className='create-container'>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                newestOnTop={false}
                closeOnClick={false}
                closeButton={false}
                rtl={false}
                theme="dark"
                pauseOnFocusLoss={true}
                draggable={false}
            />
            <h1 className='create-heading'>Create</h1>
            <form>
                <input type={'text'} value={state.title} name={'title'} onChange={handleChange} placeholder={'Title'} className="input"/>
                <textarea type={'text'} value={state.description} name={'description'} placeholder={'Description'} onChange={handleChange} className="input"/>
                <input type={'number'} value={state.price} name={'price'} placeholder={'Price'} onChange={handleChange} min={1} />
                <input type={'file'} name={'file'} onChange={handleFile} className="input"/>
                <div onClick={handleSubmit} className="button">Mint The NFT</div>
            </form>
        </div>
    )
}

export default Create