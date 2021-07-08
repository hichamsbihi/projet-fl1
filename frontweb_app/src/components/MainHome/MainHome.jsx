import { Carousel } from 'antd';
import {Component} from 'react'

import './style.css'



export default class MainHome extends Component {


    render(){
      const contentStyle = {
        height: '500px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#ae007c',
        backgroundImage: "url(" + "https://webasset.fivesgroup.com/_Never_Delete_/1/1/csm_SOHAR_ALU490_06176c035c.jpg" + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        opacity: "50%"
        
      };
      const backstyle = {  
        backgroundImage: "url(" + "https://webasset.fivesgroup.com/_Never_Delete_/1/1/csm_SOHAR_ALU490_06176c035c.jpg" + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      };
        return (
          <>
          <Carousel>
          <div>
            <div style={backstyle}></div>
            <h3 style={contentStyle}></h3>
            
          </div>
        </Carousel>
        <div style={{
          position: "absolute",
          left: '30%',
          top: "50%",
          color: "#ae007c",
          fontSize: "50px",

        }}>INDUSTRY CAN DO IT</div>

       </>
        )
    }
 

}