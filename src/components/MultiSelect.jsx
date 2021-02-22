import { default as ReactSelect } from "react-select";

const MultiSelect = (props) => {
  if (props.allowSelectAll) {
    if (props.value.length === props.options.length) {
      return (
        <ReactSelect
          {...props}
          value={[props.allOption]}
          onChange={(selected) => props.onChange(selected.slice(1))}
        />
      );
    }

    return (
      <ReactSelect
        {...props}
        options={[props.allOption, ...props.options]}
        onChange={(selected) => {
          if (
            selected.length > 0 &&
            selected[selected.length - 1].value === props.allOption.value
          ) {
            return props.onChange(props.options);
          }
          return props.onChange(selected);
        }}
      />
    );
  }

  return <ReactSelect {...props} />;
};

MultiSelect.defaultProps = {
  allOption: {
    label: "Select all",
    value: "*",
  },
};

export default MultiSelect;
