export const InputField = ({
  title,
  content,
  setContent,
  inputType = "text",
  propertyChangeName = null,
  isHidden = false,
  dataTest,
}) => {
  let changeContent;
  let viewContent;

  if (!propertyChangeName) {
    changeContent = (e) => {
      setContent(e.target.value);
    };
    viewContent = content;
  } else {
    changeContent = (e) => {
      let tmp = { ...content };
      let pcn = propertyChangeName;
      if (!tmp[pcn[0]]) tmp[pcn[0]] = {};
      tmp[pcn[0]][pcn[1]] = e.target.value;
      setContent({ ...tmp });
    };

    let pcn = propertyChangeName;
    viewContent = content[pcn[0]] ? content[pcn[0]][pcn[1]] : "";
  }

  return (
    <div className="flex flex-col" hidden={isHidden}>
      <label className="text-left font-semibold" hidden={isHidden}>
        {title}
      </label>
      <input
        data-test={dataTest}
        hidden={isHidden}
        type={inputType}
        className="border border-gray-200 rounded px-2 py-1"
        value={viewContent}
        onChange={(e) => {
          changeContent(e);
        }}
      />
    </div>
  );
};
