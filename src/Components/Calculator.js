import {useState, useEffect} from 'react'

export default function Calculator(props){
    const [numbers, setNumbers] = useState([''])
    const [log, setLog] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if(numbers.length === 0 || numbers.length === 1)  {
            setCurrentIndex(0)
        } else if(numbers.length > 1) {
            setCurrentIndex(2)
        }
    }, [numbers])

    useEffect(() => {
        console.log(numbers)
        if(currentIndex === 2 && numbers[currentIndex] === '') {
            setLog(numbers[0])
        } else {
            setLog(numbers[currentIndex])
        }
    }, [numbers])
    
    function combine(NumsArray) {
        switch(NumsArray[1]) {
            case '+':
                return parseFloat(NumsArray[0]) + parseFloat(NumsArray[2])
            case '-':
                return parseFloat(NumsArray[0]) - parseFloat(NumsArray[2])
            case '*': 
                return parseFloat(NumsArray[0]) * parseFloat(NumsArray[2])
            case '/':
                return parseFloat(NumsArray[0]) / parseFloat(NumsArray[2])
            default:
                throw new Error('thing does not exists')
        }
    }

    function Equal() {
        if(numbers.length !== 3) {
            return
        }
        const FinalNum = combine(numbers)
        setNumbers([FinalNum])
        setLog(FinalNum)
    }

    function handleKeyClick({target}) {
        if(numbers[currentIndex][0] === '0' && target.value === '0') {
            return
        } 

        let newNum = numbers[currentIndex] + target.value
        setNumbers(prev => {
            let newNums = [...prev]
            if(newNum[0] === '0' && newNums[currentIndex].length === 1 && target.value !== '.') {
                console.log('something')
                newNum = newNum.slice(1)
            }
            newNums[currentIndex] = newNum
            return newNums
        })
        }
    
    function clear() {
        setNumbers([''])
        setLog('')
    }

    function clearIndex() {
        setNumbers(prev => {
            let newPrev = [...prev]
            newPrev[currentIndex] = ''
            return newPrev
        })
    }

    function ChangePositivity() {
        setNumbers(prev => {
            let newPrev = [...prev]
            const currentNum = newPrev[currentIndex]
            console.log(currentNum)
            if(parseFloat(currentNum) >= 0) {
                newPrev[currentIndex] = '-' + currentNum
            } else {
                newPrev[currentIndex] = currentNum.slice(1)
            }
            return newPrev
        })
    }

    function handleOperatorClick({target}) {
        if(numbers[0] === '') {
            return 
        }
        setNumbers(prev => {
            let newPrev = [...prev]
            if(newPrev.length === 1) {
                newPrev.push(target.value)
                newPrev.push('')
            } else if(newPrev.length === 3) {
                const FinalNum = combine(newPrev) + ''
                const newList = [FinalNum, target.value, '']
                setLog(FinalNum)
                return newList
            }
            
            return newPrev
        })
    }

    return (
        <div id='calculator'>
            <Logger value={log}/>
            <div id='options'>
                <button className='optionsKey' onClick={clear}>C</button>
                <button className='optionsKey' onClick={clearIndex}>CE</button>
                <button className='optionsKey' onClick={ChangePositivity}>+/-</button>
            </div>
            <div id='keypad'>
                <div className='Row'>
                    <CalculatorKey Key={'1'} handleClick={handleKeyClick}/>
                    <CalculatorKey Key={'2'} handleClick={handleKeyClick}/>
                    <CalculatorKey Key={'3'} handleClick={handleKeyClick}/>
                </div>
                <div className='Row'>
                    <CalculatorKey Key={'4'} handleClick={handleKeyClick}/>
                    <CalculatorKey Key={'5'} handleClick={handleKeyClick}/>
                    <CalculatorKey Key={'6'} handleClick={handleKeyClick}/>
                </div>
                <div className='Row'>
                    <CalculatorKey Key={'7'} handleClick={handleKeyClick}/>
                    <CalculatorKey Key={'8'} handleClick={handleKeyClick}/>
                    <CalculatorKey Key={'9'} handleClick={handleKeyClick}/>
                </div>
                <div className='Row'>
                    <CalculatorKey Key={'0'} handleClick={handleKeyClick}/>
                    <CalculatorKey Key={'.'} handleClick={handleKeyClick}/>
                </div>
                
            </div>
            <div id='operators'>
                <CalculatorKey Key={'+'} handleClick={handleOperatorClick}/>
                <CalculatorKey Key={'-'} handleClick={handleOperatorClick}/>
                <CalculatorKey Key={'*'} handleClick={handleOperatorClick}/>
                <CalculatorKey Key={'/'} handleClick={handleOperatorClick}/>
                <CalculatorKey Key={'='} handleClick={Equal}/>
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
