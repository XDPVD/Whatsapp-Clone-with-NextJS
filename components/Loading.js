import {Circle} from "better-react-spinkit"

export default function loading() {
    return(
        <center style={{display: "grid", placeItems:"center", height: "100vh"}}>
            <div>
                <img 
                    src="https://es.logodownload.org/wp-content/uploads/2018/10/whatsapp-logo-11.png"
                    alt=''
                    height={200}
                    style={{ marginBottom: 20 }}
                >
                </img>

                <Circle color="#3CBC28" size={60} />    

            </div>
        </center>
    )
}