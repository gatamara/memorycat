import { Card } from './components/Card'
import './style.css'
import confetti, { reset } from "canvas-confetti"
import { initialElementos, Elemento, ElementoPosition } from './bd'
import { useEffect, useState } from 'react'
import { WinnerMessage } from './components/WinnerMessage'
import gatosImg from './assets/img/gato.png'
import huellaGato from './assets/img/huella.png'
import IMAGES from './index.json'


const initialIsFlipped: boolean[] = Array(12).fill(false)

function App() {

  const [elementos, setElementos] = useState<Elemento[]>(initialElementos)

  const [isFlipped, setIsFlipped] = useState<boolean[]>(initialIsFlipped)

  const [fistCardFlipped, setFisrtCardFlipped] = useState<ElementoPosition>() //id, par, position

  const [secondCardFlipped, setSecondCardFlipped] = useState<ElementoPosition>() //id, par, position

  const [isWinner, setIsWinner] = useState(false)

  const resetGame = () => {
    setIsFlipped(initialIsFlipped)
    setIsWinner(false)
  }

  //esto se ejecuta solo mla primera vez que carga el componente
  useEffect(() => {

    //desordena el array
    let newElementos = [...elementos]
    newElementos = newElementos.sort(() => Math.random() - 0.5)
    setElementos(newElementos)

  }, [])

  useEffect(() => {

    if (fistCardFlipped !== undefined && secondCardFlipped !== undefined) {

      setTimeout(() => {
        if (fistCardFlipped.par === secondCardFlipped.par) {
          setFisrtCardFlipped(undefined)
          setSecondCardFlipped(undefined)
        } else {
          const newIsFlipped = [...isFlipped]
          newIsFlipped[fistCardFlipped.position] = false
          newIsFlipped[secondCardFlipped.position] = false
          setIsFlipped(newIsFlipped)
          setFisrtCardFlipped(undefined)
          setSecondCardFlipped(undefined)
        }
      }, 1000)
    }

  }, [secondCardFlipped])

  useEffect(() => {

    if (isFlipped.every((elemento) => elemento === true)) {
      setTimeout(() => {

        setIsWinner(true)
        confetti()
      }, 1200)
    }
  }, [isFlipped])

  const handleClick = (position: number) => {

    //si la card esta dada vuelta, esta funcion no seguira ejecutandose
    if (isFlipped[position]) return
    //
    if (fistCardFlipped !== undefined && secondCardFlipped !== undefined) return

    console.log(position);
    const newIsFlipped = [...isFlipped]
    newIsFlipped[position] = true

    setIsFlipped(newIsFlipped)

    //si es la primera card que damos vuelta, el elemento se guarda en firtCardFlipped
    if (fistCardFlipped === undefined) {

      const elementoClickeado = elementos[position]

      const elementoPosition: ElementoPosition = { id: elementoClickeado.id, par: elementoClickeado.par, position: position }

      setFisrtCardFlipped(elementoPosition)


    } else if (secondCardFlipped === undefined) {

      const elementoClickeado = elementos[position]

      const elementoPosition: ElementoPosition = { id: elementoClickeado.id, par: elementoClickeado.par, position: position }

      setSecondCardFlipped(elementoPosition)

    }

  }

  return (
    <>
      <div className='container'>
        <header>
          <img id="cat-header" src={gatosImg} alt="" />
          <h1 className='title'>Memory cat</h1>
          <img id="cat-header" src={gatosImg} alt="" />
        </header>
        <div className='main'>
          <section className="container-card">
            {
              elementos.map(({ id, par, imagen }, index) => <Card key={id} id={id} par={par} imagen={imagen} isFlipped={isFlipped[index]} position={index} handleClick={handleClick} />)
            }
          </section>

          {isWinner && <div id="mensaje-ganaste"> <WinnerMessage resetGame={resetGame} /> </div>}

        </div>
      </div>
      <footer>
        <div id="pieDePagina"><span> Juego creado por Tamara Salinas </span> <img src={huellaGato} alt="" /></div>
      </footer>
    </>
  )
}

export default App
