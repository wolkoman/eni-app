import React,  { useEffect } from 'react';
import Radium from 'radium';
import { style } from './style';
import { useHistory } from 'react-router-dom';

const RedirectNotice = Radium(() => {
    const timeout = localStorage.getItem('redirect-notice') ? 0 : 10;
    const history = useHistory();
    const spinnerKeyframes = Radium.keyframes({
        '0%': { width: '0%' },
        '100%': { width: '100%' },
    });
    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem('redirect-notice', true);
            history.push('/');
        }, timeout * 1000);
        return () => clearTimeout(timer);
      });
    return (
        <div style={{ padding: 50, fontSize: 30 }}>
            <p style={{fontWeight: 'bold', fontSize: 25}}>
                Willkommen auf der Seite der<br></br>
                Pfarren Emmaus am Wienerberg,<br></br>
                Inzersdorf-Neustift und Inzersdorf.
            </p>
            <p>
                Hier finden Sie alle Termine und<br></br>
                wichtigen Informationen.
            </p>
            <div style={{
                background: style.dark,
                animation: `q ${timeout}s linear infinite`,
                animationName: spinnerKeyframes,
                height: 5,
            }}></div>
        </div>
    );

});

export default RedirectNotice;