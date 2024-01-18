import { TABLES, TableNames } from '../../assets/constants/tables';

interface IProps {
  tableName: (typeof TableNames)[keyof typeof TableNames];
  list: Record<string, any>[];
  handleClick?: (id: number) => void;
}

export const Table = ({ handleClick, tableName, list }: IProps) => {
  const { HEADER, TITLES } = TABLES[tableName];
  const titles = Object.keys(TITLES);

  const onClick = (id: number) => {
    if (handleClick) {
      return handleClick(id);
    }
  };

  return (
    <div>
      <h2>{HEADER}</h2>
      <table>
        <thead>
          <tr>
            {Object.values(TITLES).map((title) => (
              <th key={title}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((record) => (
            <tr
              key={record[titles[0]]}
              onClick={() => onClick(record[titles[0]])}
            >
              {titles.map((title) => (
                <td key={record[title]}>{record[title]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
