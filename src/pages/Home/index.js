import React, { useState, useEffect} from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Home() {

    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get('filmes')
            setFilmes(response.data)
        }

        loadFilmes()
    }, [])
    
    return (
        <div className="container">
            <Header />
            <div className="container-filmes">
                <div className="lista-filmes">
                    {filmes.map((filme) => {
                        return(
                            <article key={filme.id}>
                                <strong>{filme.nome}</strong>                                
                                <Link to={`/filme/${filme.id}`}>
                                    <img src={filme.foto} alt={filme.nome} />
                                </Link>
                            </article>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}