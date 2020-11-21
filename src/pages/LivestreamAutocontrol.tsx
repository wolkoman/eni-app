import React, { useEffect, useRef, useState } from "react"
import { getApiKey } from "../store/auth.selector"
import { State } from "../store/state"
import { connect } from "react-redux";
import cockpit from "../util/cockpit";
import { ActionButton } from "./NewsletterAdministration";
import Box from "../components/Box";
import LiturgyLive from "../components/LiturgyLive";

interface LiturgyDto{
    _id: string, title: string, items: LiturgyItemDto[]
}
interface LiturgyItemDto{
    field: {name: "sing-a-long"},
    value: {title: string, content: string}
}

export default connect((state: State) => ({api_key: getApiKey(state)}))(({api_key}:{api_key: string}) => {
    const [liturgies, setLiturgies] = useState<LiturgyDto[]>([]);
    const [selectedLiturgy, setSelectedLiturgy] = useState<LiturgyDto>();
    const [selectedLiturgyItem, setSelectedLiturgyItem] = useState<LiturgyItemDto>();
    useEffect(() => {
        cockpit.collection("liturgy", api_key).then(({entries}: {entries: LiturgyDto[]}) => {
            setLiturgies(entries);
        });
        return () => {};
    }, [api_key])
    return  <div>
    <Box label="Autocontrol" padded={true} styled={true}>
        {
            selectedLiturgyItem
            ? <Recer title={selectedLiturgyItem.value.title} content={selectedLiturgyItem.value.content}/>
            : selectedLiturgy
            ? selectedLiturgy.items
                .filter(item => item.field.name === "sing-a-long")
                .map(item => <ActionButton label={item.value.title} onClick={() => setSelectedLiturgyItem(item)}/>)
            : liturgies
                .map(liturgy => 
                    <ActionButton label={liturgy.title} key={liturgy._id} onClick={() => setSelectedLiturgy(liturgy)}/>
                )
        }
        </Box>
        <LiturgyLive/>
        </div>
});

const Recer = ({title, content}: {title: string, content: string}) => {
    const vidRef = useRef(null);
    const [parts, setParts] = useState<string[]>([]);
    const [fileUrl, setFileUrl] = useState<string>();
    const [positions, setPositions] = useState<number[]>([]);
    useEffect(() => {
        if(!content) return;
        setParts(["", ...content.split("\n\n"), ""]);
        return () => {};
    },[content]);
    const play = () => {
        (vidRef.current as any).play();
    };
    const stop = () => {
        setPositions([]);
        (vidRef.current as any).pause();
        (vidRef.current as any).currentTime = 0;
    };
    const next = () => {
        let time = Math.round(1000*(vidRef.current as any).currentTime);
        let prevTime = positions.length === 0 ? 0 : positions.reduce((a,b) => a+b,0);
        setPositions([...positions,time-prevTime ]);
    };
    return <div>
        <h3>{title}</h3>
        <input type="file" onChange={(e: any) => setFileUrl(URL.createObjectURL(e.target.files[0]))}/>
        <button onClick={play}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={next}>Next</button>
        <div>{JSON.stringify(positions)}</div>
        <div>{parts[positions.length]}</div>
        <video src={fileUrl} ref={vidRef} style={{width: "400px"}}></video>
    </div>
}