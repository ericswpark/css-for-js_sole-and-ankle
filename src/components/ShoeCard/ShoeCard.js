import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  
  const flagColor = variant === 'new-release' ? COLORS.secondary : COLORS.primary;
  const flagText = variant === 'new-release' ? 'Just Released!' : 'Sale';

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        { variant !== 'default' && <Flag style={{'--flag-color': flagColor}}>{flagText}</Flag> }
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={{
            '--text-decoration': variant === 'on-sale' ? 'line-through' : undefined,
            '--color': variant === 'on-sale' ? COLORS.gray[700] : undefined,
          }}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === "on-sale" && <SalePrice>{formatPrice(salePrice)}</SalePrice> }
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;

  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: var(--text-decoration);
  color: var(--color);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Flag = styled.span`
  height: 32px;
  background-color: var(--flag-color);
  position: absolute;
  top: 0;
  right: 0;
  line-wrapping: nowrap;
  line-height: 32px;
  color: ${COLORS.white};
  padding: 0 10px;
  margin-top: 12px;
  margin-right: -4px;
  border-radius: 2px;
  font-size: ${14 / 16}rem;
  font-weight: ${WEIGHTS.bold};
`;

export default ShoeCard;
