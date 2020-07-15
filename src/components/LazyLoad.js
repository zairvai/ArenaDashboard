import React,{Suspense} from 'react'
import Loading from './Loading'

export default ({component:Component,...rest}) => (
    <>
        <Suspense fallback={<Loading/>}>
            <Component {...rest} />
        </Suspense>
    </>
)