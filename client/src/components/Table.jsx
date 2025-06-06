import "./Table.css";

const Table = ({ links }) => {
  return (
    <div className="table-container">
      <table className="links-table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Category</th>
            <th>Description</th>
            <th>URL</th>
            <th>Created On</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.link_id}>
              <td>
                <img src={link.image} alt={link.title} className="table-image" />
              </td>
              <td>{link.title}</td>
              <td>{link.category}</td>
              <td>{link.description}</td>
              <td>
                <a href={link.url} target="_blank" rel="noopener noreferrer"> {link.url} </a>
              </td>
              <td>{link.created_on}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
