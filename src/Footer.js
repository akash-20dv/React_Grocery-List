const Footer = ({length}) => {
    const footerStyle = {
    
        backgroundColor:'#777',
        textAlign: 'center',
        padding:'3px',
        width:'100%'
    }
    // const today = new Date();

    return (
        <footer style={footerStyle} >
            <p>{length} List {length===1?'item':'items'}</p>        
        </footer>
    )
}

export default Footer
