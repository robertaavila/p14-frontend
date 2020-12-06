import React from 'react';
import 'bulma/css/bulma.css';

export default class NotFound extends React.Component {
    render() {
        return (
            <div>
                <a class="button is-primary" href="/" style={{marginTop: "15px"}}>
                    Página inicial
                </a>
                <section className="section is-medium">
                    <div className="container">
                        <div className="column has-text-centered" style={{position: 'relative', zIndex: 100}}>
                            <h1 className="title" style={{ fontSize: "140px", color: "#0b3e42" }}>
                                404
                            </h1>
                            <p className="subtitle" style={{ fontSize: "26px", color: "aliceblue" }}>
                                A página que você está tentando acessar não existe.
                            </p>
                        </div>
                        <div className="column">
                            <img src="/img/404.gif" style={{ position: "absolute", top: 0, left: 0, width: "100%", opacity: ".3" }} />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}