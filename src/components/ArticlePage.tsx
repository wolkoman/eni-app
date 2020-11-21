import React from "react"
import { useRouteMatch } from "react-router-dom"
import cockpit from "../util/cockpit"
import Article from "./Article"
import Box from "./Box"

export default ({slug}:{slug:string})=> {
    return <Box label="" styled={true} padded={true}>
        <Article article={() => cockpit
            .collection("article",undefined,`&filter[slug]=${slug}`)
            .then(({entries}) => new Promise((res,rej) => {
                if(entries.length !== 1) rej();
                res(entries[0]);
            }))
        }
        />
    </Box>
}