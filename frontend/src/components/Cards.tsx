import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//import layout components
import { Div } from "./layout/Containers";

//import token
import { spacing } from "./token";

//import assets
import { ChevronRight } from "../assets/Icons";

export interface Props {
  padding?: string;
  margin?: string;
  img?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  background?: string;
  icon?: string;
  url?: any;
  size?: "full" | "half";
}

type StyleProps = {
  padding?: string | undefined;
  margin?: string | undefined;
  size?: string | undefined;
  background?: string | undefined;
};

export const Card: FC<Props> = ({
  children,
  padding,
  img,
  alt,
  title,
  subtitle,
  url,
  size,
}) => {
  return (
    <CardContainer padding={padding} size={size}>
      <Link to={url}>
        <img src={img} alt={alt} />
        <Div padding={`${spacing.s} 0`}>
          <h6 className="kicker">{subtitle}</h6>
          <h5 className="vspacexxs">{title}</h5>
        </Div>
      </Link>
    </CardContainer>
  );
};

export const SimpleCard: FC<Props> = ({
  padding,
  margin,
  background,
  title,
  subtitle,
  url,
  icon,
  size,
}) => {
  return (
    <CardContainer
      padding={padding}
      margin={margin}
      size={size}
      background={background}
    >
      <Link to={url}>
        <Div padding={`${spacing.s} 0`} className="flex">
          {icon && <div className="two">{icon}</div>}
          <div>
            <h5>{title}</h5>
            <p className="p3">{subtitle}</p>
          </div>
          <div>
            <ChevronRight width={20} height={20} color="#000" stroke={2} />
          </div>
        </Div>
      </Link>
    </CardContainer>
  );
};

const CardContainer = styled.article<StyleProps>`
  width: 100%;
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  border-radius: 1rem;
  background: ${(props) => props.background && props.background};

  img {
    width: 100%;
    height: 170px;
    object-fit: cover;
    border-radius: 1rem;
  }
`;
