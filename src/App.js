import "./styles.css";

const openFile = async () => {
  try {
    // Always returns an array.
    const [handle] = await window.showOpenFilePicker();
    return handle.getFile();
  } catch (err) {
    console.error(err.name, err.message);
  }
};

export default function App() {
  return (
    <div className="App">
      <button onClick={() => openFile()}>Upload pdf</button>
    </div>
  );
}
