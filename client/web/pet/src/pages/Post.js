import "./css/Post.css"

const Post = () => {
    return(
        <div className="Post">
            
            <div className="card">
                <div className="card-body">
                    <div className="top">
                        <h6>Total My Pet Post</h6>
                        <div className="icon">
                            <i className="fas fa-edit"></i>
                            <i className="fas fa-trash"></i>
                        </div>
                        
                    </div>
                    <h3>15,830</h3>
                    <p><span className="label">+12%</span>Up from yesterday</p>
                </div>
            </div>


            <div className="card">
                <div className="card-body">
                    <div className="top">
                        <h6>Total Homeless Pet Post</h6>
                        <div className="icon">
                            <i className="fas fa-edit"></i>
                            <i className="fas fa-trash"></i>
                        </div>                        
                    </div>                   
                    <h3>6,780</h3>                                
                    <p><span className="label">+52%</span>Down from yesterday</p>
                </div>
            </div>



            <div className="card">
                <div className="card-body">
                    <div className="top">
                        <h6>Total Give Pet Post</h6>
                        <div className="icon">
                            <i className="fas fa-edit"></i>
                            <i className="fas fa-trash"></i>
                        </div>                        
                    </div>
                    
                    <h3>6,784</h3>                    
                    <p><span className="label">+52%</span>Up from yesterday</p>
                </div>
            </div>
        </div>
    );
}

export default Post;