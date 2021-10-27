import React, {useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router'
import './filme.css'

import api from '../../services/api'
import { toast } from 'react-toastify'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Filme() {

    const { id } = useParams()
    const history = useHistory()
    const [filme, setFilme] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilme() {
            const response = await api.get(`filmes/${id}`)

            //Condição pra checar se o ID do filme existe
            if(response.data.length ===0) {
                history.replace('/home')
                return
            }

            setFilme(response.data)
            setLoading(false)
        }

        loadFilme()        
    
        return () => {
            console.log('componente desmontado')
        } 
    }, [id, history])

    function salvarFilme() {

        const meusFilmes = localStorage.getItem('filmes')
        let filmesSalvos = JSON.parse(meusFilmes) || []

        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

        if(hasFilme) {
            toast.error('O filme já está salvo em sua lista.')
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos))
        toast.success('O filme foi salvo em sua lista com sucesso.')
    }

    if(loading) {
        return (
            <div className="content-filmes">
                <div className="filme-info">
                    <h1>Nossos Dwarfs foram buscar seus filmes!</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="content-filmes">
            <Header />        
            <div className="filme-info">
                <h1> {filme.nome} </h1>
                <img src={filme.foto} alt={filme.nome} />
                <div className="sinopse-text">
                    <h3>Sinopse do Filme:</h3>
                    {filme.sinopse}
                </div>
                <div className="buttons">
                    <button onClick={salvarFilme}>Salvar</button>
                    <button>
                        <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                            Trailer
                        </a>
                    </button>
                    <button>
                        <a target="blank" href={`https://www.google.com/search?rlz=1C1FCXM_pt-PTBR973BR973&q=${filme.nome} Elenco`}>
                            Elenco
                        </a>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}