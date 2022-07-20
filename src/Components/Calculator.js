import {useState, useEffect} from 'react'

export default function Calculator(props){
    const [numbers, setNumbers] = useState([''])
    const [log, setLog] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if(numbers.length === 0 || numbers.length === 1)  {
            setCurrentIndex(0)
        } else if(numbers.length >= 1) {
            setCurrentIndex(2)
        }
    }, [numbers])

    useEffect(() => {
        setLog(numbers[currentIndex])
    }, [numbers])
    
    function combine(sign) {
        switch(sign) {
            case '+':
                return parseInt(numbers[0]) + parseInt(numbers[2])
            case '-':
                return parseInt(numbers[0]) - parseInt(numbers[2])
            case '*': 
                return parseInt(numbers[0]) * parseInt(numbers[2])
            case '/':
                return parseInt(numbers[0]) / parseInt(numbers[2])
            default:
                throw new Error('thing does not exists')
        }
    }

    function Equal() {
        const final = combine(numbers[1])
        setNumbers([final])
        setLog(final)
    }

    function handleKeyClick({target}) {
        if(numbers[currentIndex].length === 0 && target.value === '0') {
            return
        }
        const newNum = numbers[currentIndex] + target.value
        console.log(newNum)
        setNumbers(prev => {
            let newNums = [...prev]
            newNums[currentIndex] = newNum
            return newNums
        })
        }
    
    function clear() {
        setNumbers([''])
        setLog([''])
    }

    function clearIndex() {
        setNumbers(prev => {
            
        })
    }
    return (
        <div id='calculator'>
            <Logger value={log}/>
            <div id='options'>
                <button className='optionsKey' onClick={clear}>C</button>
            </div>
            <div id='keypad'>
                <CalculatorKey Key={'0'} handleClick={handleKeyClick}/>
                <CalculatorKey Key={'1'} handleClick={handleKeyClick}/>
                <CalculatorKey Key={'2'} handleClick={handleKeyClick}/>
                <CalculatorKey Key={'3'} handleClick={handleKeyClick}/>
                <CalculatorKey Key={'6'} handleClick={handleKeyClick}/>
                <CalculatorKey Key={'4'} handleClick={handleKeyClick}/>
                <CalculatorKey Key={'5'} handleClick={handleKeyClick}/>
                <CalculatorKey Key={'7'} handleClick={handleKeyClick}/>
                <CalculatorKey Key={'8'} handleClick={handleKeyClick}/>
                <CalculatorKey Key={'9'} handleClick={handleKeyClick}/>
            </div>
        </div>
    )
}


function Logger(props) {
    return (
        <div className='Log'>
            <input value={props.value}/>
        </div>
    )
}

function CalculatorKey(props) {
    return (
        <button className="Key" onClick={props.handleClick} value={props.Key}>{props.Key}</button>
    )
}

