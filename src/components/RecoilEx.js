import { useRecoilState } from "recoil"
import { countState } from "../states/countAtom"

function RecoilEx(){
    let [countMap, setCount] = useRecoilState(countState);
    return (
        <>
            <h3>countA : {countMap.countA}</h3>
            <button onClick={()=>{setCount(prev => ({...prev, countA : countMap.countA+1}))}}>A++</button>
            <h3>countB : {countMap.countB}</h3>
            <button onClick={()=>{setCount(prev => ({...prev, countB : countMap.countB+1}))}}>B++</button>
        </>
    )
}

export default RecoilEx