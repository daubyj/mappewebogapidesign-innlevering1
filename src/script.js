import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import cors from 'cors'

//script.use('/', cors());

    fetch('http://localhost:1337/albums')
    .then(response => response.json())
    .then (albums => {
    ReactDOM.render(
        <table>{albums.sort(function (a,b){return a.year - b.year}).map(album =>
                <tbody>
                <tr>
                    <td>{album.artist}</td>
                    <td>{album.title}</td>
                    <td>{album.year}</td>
                </tr>
                </tbody>
        )} </table>,
        document.getElementById('container'));
        console.log(albums);
    });



