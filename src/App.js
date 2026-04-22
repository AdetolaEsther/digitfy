import PolaroidCard from "./components/PolaroidCard";

const App = () => {
    const year = new Date().getFullYear();

    return (
        <div className="app-container">
           
            <header className="header">
                <div className="logo">Digitify 📸</div>
                
                <div className="title">Camera Editor</div>
            </header>

            <main className="main">
                <PolaroidCard />
            </main>

            <footer className="footer">
                <div>© {year}</div>
                <div>Built by Adetola</div>
            </footer>
        </div>
    );
};

export default App;
