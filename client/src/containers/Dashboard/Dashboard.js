import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

import MessagesSummary from '../../components/MessagesSummary/MessagesSummary';
import styles from './Dashboard.module.css';

const Dashboard = props => {
    const [lastDestinations] = useState([
        {
            id: 1,
            title: 'Peru',
            image: 'http://dev.patrimonioturismo.com/img/destinos_inicio/peru.jpg',
            description: 'Patrimonios culturales'
        },
        {
            id: 2,
            title: 'Peru',
            image: 'http://dev.patrimonioturismo.com/img/destinos_inicio/peru.jpg',
            description: 'Patrimonios culturales'
        }
    ]);
    const [lastMessages] = useState([
        {
            id: 1,
            name: 'Julian',
            subject: 'Test',
            email: 'test@test.com',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id neque eu nisl molestie placerat ac sed mauris. Donec non felis quis nibh pretium malesuada. Aenean nisl tellus, rhoncus eget diam malesuada, mattis placerat ex. Ut tempor nunc et consequat egestas. Nam iaculis urna vel orci mollis, eget lacinia felis eleifend. Fusce ut maximus lacus, non volutpat nulla. Nullam sit amet urna in elit rutrum auctor. Praesent nisl mauris, posuere non ultrices non, tincidunt in lorem. Vivamus rhoncus elit sed rutrum sodales. Fusce congue elit neque, vitae feugiat mi eleifend id. Donec vitae fringilla ante. Sed venenatis velit dui, a hendrerit dolor pretium ut. Curabitur vitae ipsum eget tellus placerat sollicitudin.r'
        },
        {
            id: 2,
            name: 'Lucas',
            subject: 'Test',
            email: 'test@test.com',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id neque eu nisl molestie placerat ac sed mauris. Donec non felis quis nibh pretium malesuada. Aenean nisl tellus, rhoncus eget diam malesuada, mattis placerat ex. Ut tempor nunc et consequat egestas. Nam iaculis urna vel orci mollis, eget lacinia felis eleifend. Fusce ut maximus lacus, non volutpat nulla. Nullam sit amet urna in elit rutrum auctor. Praesent nisl mauris, posuere non ultrices non, tincidunt in lorem. Vivamus rhoncus elit sed rutrum sodales. Fusce congue elit neque, vitae feugiat mi eleifend id. Donec vitae fringilla ante. Sed venenatis velit dui, a hendrerit dolor pretium ut. Curabitur vitae ipsum eget tellus placerat sollicitudin.'
        },
        {
            id: 2,
            name: 'Lucas',
            subject: 'Test',
            email: 'test@test.com',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id neque eu nisl molestie placerat ac sed mauris. Donec non felis quis nibh pretium malesuada. Aenean nisl tellus, rhoncus eget diam malesuada, mattis placerat ex. Ut tempor nunc et consequat egestas. Nam iaculis urna vel orci mollis, eget lacinia felis eleifend. Fusce ut maximus lacus, non volutpat nulla. Nullam sit amet urna in elit rutrum auctor. Praesent nisl mauris, posuere non ultrices non, tincidunt in lorem. Vivamus rhoncus elit sed rutrum sodales. Fusce congue elit neque, vitae feugiat mi eleifend id. Donec vitae fringilla ante. Sed venenatis velit dui, a hendrerit dolor pretium ut. Curabitur vitae ipsum eget tellus placerat sollicitudin.'
        },
        {
            id: 2,
            name: 'Lucas',
            subject: 'Test',
            email: 'test@test.com',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id neque eu nisl molestie placerat ac sed mauris. Donec non felis quis nibh pretium malesuada. Aenean nisl tellus, rhoncus eget diam malesuada, mattis placerat ex. Ut tempor nunc et consequat egestas. Nam iaculis urna vel orci mollis, eget lacinia felis eleifend. Fusce ut maximus lacus, non volutpat nulla. Nullam sit amet urna in elit rutrum auctor. Praesent nisl mauris, posuere non ultrices non, tincidunt in lorem. Vivamus rhoncus elit sed rutrum sodales. Fusce congue elit neque, vitae feugiat mi eleifend id. Donec vitae fringilla ante. Sed venenatis velit dui, a hendrerit dolor pretium ut. Curabitur vitae ipsum eget tellus placerat sollicitudin.'
        },
        {
            id: 2,
            name: 'Lucas',
            subject: 'Test',
            email: 'test@test.com',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id neque eu nisl molestie placerat ac sed mauris. Donec non felis quis nibh pretium malesuada. Aenean nisl tellus, rhoncus eget diam malesuada, mattis placerat ex. Ut tempor nunc et consequat egestas. Nam iaculis urna vel orci mollis, eget lacinia felis eleifend. Fusce ut maximus lacus, non volutpat nulla. Nullam sit amet urna in elit rutrum auctor. Praesent nisl mauris, posuere non ultrices non, tincidunt in lorem. Vivamus rhoncus elit sed rutrum sodales. Fusce congue elit neque, vitae feugiat mi eleifend id. Donec vitae fringilla ante. Sed venenatis velit dui, a hendrerit dolor pretium ut. Curabitur vitae ipsum eget tellus placerat sollicitudin.'
        }
    ]);

    return (
        <section >
            <h2>Dashboard</h2>
            <div className="row justify-content-between">
                <article className="col-12 col-lg-6" >
                    <div className={styles.DashboardBox} >
                        <h3 className="text-center my-4" >Últimos destinos agregados</h3>
                        <Carousel>
                            {lastDestinations.map(element => (
                                <div key={element.id}>
                                    <img src={element.image} alt={element.title} />
                                    <div className="legend">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <h5> {element.title} </h5>
                                        </div>
                                        <p>{element.description}</p>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </article>
                <article className="col-12 col-lg-6">
                    <div className={styles.DashboardBox}  >
                        <h3 className="text-center my-4" >Últimos mensajes recibidos</h3>
                        <MessagesSummary data={lastMessages} />
                    </div>

                </article>
            </div>

        </section>
    );
};

export default Dashboard