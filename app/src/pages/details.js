/* eslint-disable no-undef */
import { limit, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { DatabaseService } from '../adaptors/firebase';
import './details.css';

const Details = () => {
    const [state, setState] = useState({})
    var { id } = useParams();

    async function getData() {
        var data = await DatabaseService.get({
            col: "nfts",
            query: (ref) => {
                return query(ref, where('token_id', '==', parseInt(id)), limit(1))
            }
        });
        var nft = data[0];
        setState(nft);
    }

    async function onSell() {
        if (typeof window.ethereum !== 'undefined') {
        }
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        await DatabaseService.update({
            col: 'nfts',
            id: state.id,
            data: {
                isNew: false,
                owner: account
            }
        })

        const transactionParameters = {
            nonce: '0x00', // ignored by MetaMask
            gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
            gas: '0x2710', // customizable by user during MetaMask confirmation.
            to: state.creator, // Required except during contract publications.
            from: ethereum.selectedAddress, // must match user's active address.
            value: '2000000000000000', // Only required to send ether to the recipient from the initiating external account.
            data:
                '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
            chainId: '0x1', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };

        // txHash is a hex string
        // As with any RPC call, it may throw an error
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });


    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <div className='details-container'>
            <div className='details-image-container'>
                <img src={state.image} className="details-image" />
            </div>
            <div className='details-info-container'>
                <h1 className='item-title'>{state.title}</h1>
                <p className='item-creator'>{state.creator}</p>
                <p className='item-owner'>{state.owner}</p>
                <p className='item-description'>
                    {state.description}
                </p>
                <div style={{ display: 'flex' }}>
                    <div className='item-price' onClick={onSell}>Buy IN {state.price} ETH</div>
                </div>
            </div>
        </div>
    )
}

export default Details