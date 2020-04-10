import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";
import Theme from "./Theme";

function Typography(props) {
  const { style, ...rest } = props;
  const variants = {
    p: Theme.fontSize,
    h1: Theme.h1,
    h2: Theme.h2,
    h3: Theme.h3
  };
  return (
    <Text
      style={{
        ...styles.text,
        fontSize: variants[props.variant],
        fontWeight: props.variant === "p" ? props.weight : "bold",
        color: props.color,
        textAlign: props.textAlign,
        ...style
      }}
      {...rest}
    >
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Theme.Gray7,
    marginBottom: 5
  }
});

Typography.defaultProps = {
  variant: "p",
  color: Theme.Gray7,
  textAlign: "left"
};
Typography.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  textAlign: PropTypes.string,
  ellipsizeMode: PropTypes.oneOf(["tail"]),
  numberOfLines: PropTypes.number
};

export default Typography;
