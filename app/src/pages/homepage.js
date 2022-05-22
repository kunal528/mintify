/* eslint-disable no-undef */
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Card from '../components/card';
import './homepage.css'
import { GlobalState } from '../GlobalState';
import { DatabaseService } from '../adaptors/firebase';
import { limit, query, where } from 'firebase/firestore';


const HomePage = () => {
    var [data, setData] = React.useState([]);

    const getData = async () => {
        var _data = await DatabaseService.get({
            col: 'nfts',
            query: (ref) => {
                return query(ref, where('isNew', '==', true), limit(8))
            }
        });
        setData(_data);
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div>
            <div className='header-section'>
                <div className='header-section-content'>
                    Cryptographics
                </div>
                <Link to={'/create'} className="remove-link">
                    <div className='create-button'>
                        Create New Item
                    </div>
                </Link>
            </div>
            <div className='grid-container'>
                {data.map((e, i) => {
                    return <Card key={i} data={e}/>
                })}
            </div>
        </div>
    )
}

export default HomePage