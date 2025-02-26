const Confirmation = function() {
    const location = ReactRouterDOM.useLocation();
    const history = ReactRouterDOM.useHistory();
    const formData = location.state.formData;
   const name = location.state.name
   const age = location.state.age
   const title = location.state.title
   const hometown = location.state.hometown

    React.useEffect(() => {
        if (!name) {
            history.replace('/');
        }
    }, [formData, history]);

    if (!name) {
        return null;
    }

    return ( 
            
                <div className="main card"> 
                        <h2 >Submission Confirmed</h2>
                         
                         
                            <div className="divider"></div>
                            <div className="comicGrid singlebook">
                               
                               <div className="card">
                                    Contact:
                                    {title} {name}
                                    <br />
                                    From {hometown}
                                    Age {age}
                               </div>
                          
                                        
                           
                                 
                        </div>
                        <div className="divider"></div>
                        <button 
                            onClick={() => history.push('/')}
                            className="secondary"
                        >
                            Return
                        </button>
                    </div> 
    );
};

// Make Confirmation available globally
window.Confirmation = Confirmation;