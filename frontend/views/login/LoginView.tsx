import './LoginView.css';

export default function LoginView() {
  return (
    <div className="box-form">
      <div className="left">
        <div className="overlay">
          <h1>Book Store.</h1>
        </div>
      </div>
      <div className="right">
        <h5>Login</h5>
        <p>
          Don't have an account? <a className="link">Creat Your Account</a>
        </p>
        <div className="inputs">
          <input type="text" placeholder="user name" />
          <br />
          <input type="password" placeholder="password" />
        </div>
        <br />
        <br />
        <br />
        <button className="button" onClick={() => console.log('hi')}>
          Login
        </button>
      </div>
    </div>
  );
}
