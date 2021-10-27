import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './favoritos.css'
import { toast } from 'react-toastify'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Favoritos() {
    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const meusFilmes = localStorage.getItem('filmes')
        setFilmes(JSON.parse(meusFilmes) || [])

    }, [])

    function handleDelete(id) {
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
        })

        setFilmes(filtroFilmes)
        localStorage.setItem('filmes', JSON.stringify(filtroFilmes))
        toast.success('Filme excluído com sucesso!')
    }

    return (
        <div className="container-fav">
            <Header />
            <div id="meus-filmes">                 
                {filmes.length === 0 && <span>Você ainda não possui filmes salvos. :(</span>}
                <ul>
                    {filmes.map((item) => {
                        return (
                            <li key={item.id}>
                                <span>{item.nome}</span>
                                <div>
                                    <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                                    <button onClick={() => handleDelete(item.id)}>Excluir</button>
                                </div>
                            </li>
                        )
                    })}    
                </ul>    
            </div>
            <Footer />        
        </div>
    )
}