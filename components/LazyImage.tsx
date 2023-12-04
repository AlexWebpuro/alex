import { useEffect, useRef, useState } from "react";
import type { ImgHTMLAttributes } from 'react';

type LazyImageProps = { src: string, onLazyLoad?: ( img:HTMLImageElement ) => void };
type ImageNative = ImgHTMLAttributes<HTMLImageElement>
type Props = LazyImageProps & ImageNative;

export const LazyImage = ( { src, onLazyLoad, ...imgProps }: Props ): JSX.Element => {
    const node = useRef<HTMLImageElement>( null );
    // const [ src, setSrc ] = useState('https://placehold.co/600x400/png');
    const [ currentSrc, setCurrentSrc ] = useState('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=');
    const [ isLazyLoaded, setIsLazyLoaded ] = useState( false );

    useEffect( () => {
        if( isLazyLoaded ) {
            return;
        }
        // New observer
        const observer = new IntersectionObserver( (entries) => {
            entries.forEach( entry => {
                // On intersection -> console.log()
                if( !entry.isIntersecting || !node.current ) {
                    return;
                }
                setCurrentSrc( src );
                console.log(`Hey you observe me!`);
                observer.disconnect();
                setIsLazyLoaded( true );

                if( typeof onLazyLoad === 'function' ) {
                    onLazyLoad( node.current );
                }
            })
        } )
        // Oberser node
        if( node.current ) {
            observer.observe( node.current );
        }
    
        // Dosconnect
        return () => {
            observer.disconnect();
        }
    }, [ src, onLazyLoad, isLazyLoaded ] );


    return(
        <img 
            ref={ node }
            src={currentSrc}
            { ...imgProps }
        />
    )
}