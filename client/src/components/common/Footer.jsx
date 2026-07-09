import "./Footer.css";

function Footer() {
  return (

    <footer className="footer">

      <h3>CF Compass</h3>

      <p>
        Helping competitive programmers analyze their
        performance and improve consistently.
      </p>

      <div className="footer-tech">

        <span>React</span>

        <span>Express</span>

        <span>Codeforces API</span>

      </div>

      <span className="footer-version">
        Version 1.0
      </span>

    </footer>

  );
}

export default Footer;