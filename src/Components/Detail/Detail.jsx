import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Detail = () => {
    const movieDetail = useSelector((state) => state.movieDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        let {id} = props.match.params;
    })
    
  return (
    <div>
        test
    </div>
  )
}

export default Detail