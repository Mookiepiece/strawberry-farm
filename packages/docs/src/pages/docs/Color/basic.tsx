import React from 'react';
import { Box } from '🦄';

const BasicUsage: React.FC = () => {
  return (
    <>
      <style>
        {`

      .🎏🧥🩳🎲 {
        font-size: 14px;
        height: 150px;
        width: 150px;
        user-select: all;
        vertical-align: middle;
        margin: 12px;
        border-radius: 35% 45%/50% 80%;
      }
      .🎏🧥🩳🎲 span {
        font-family: Consolas, sans-serif;
        font-size: 12px;
        filter:
          drop-shadow(1px 0px white)
          drop-shadow(0px 1px white)
          drop-shadow(1px 0px white)
          drop-shadow(0px 1px white)
          drop-shadow(-2px 0px white)
          drop-shadow(0px -2px white);
      }
      `}
      </style>
      <div>
        {[
          [
            {
              color: '--color-primary',
            },
            {
              color: '--color-primary-fade-200',
            },
            {
              color: '--color-primary-fade-100',
            },
          ],
          [
            {
              color: '--color-dark',
            },
            {
              color: '--color-dark-fade-200',
            },
            {
              color: '--color-dark-fade-100',
            },
          ],
          [
            {
              color: '--color-contrasting',
            },
            {
              color: '--color-contrasting-fade-200',
            },
            {
              color: '--color-contrasting-fade-100',
            },
          ],
          [
            {
              color: '--color-danger',
            },
            {
              color: '--color-danger-fade-200',
            },
            {
              color: '--color-danger-fade-100',
            },
          ],
        ].map((row, rowIndex) => (
          <Box key={rowIndex} wrap>
            {/* <div className={`🎏🧥🩳🎲 🎏🧥🩳🎲${n}`}>
              <span>{`--${n}`}</span>
            </div> */}
            {row.map(({ color }, index) => (
              <div
                className={`🎏🧥🩳🎲 🎏🧥🩳🎲`}
                key={index}
                style={{
                  background: `var(${color})`,
                }}
              >
                <span>{color}</span>
              </div>
            ))}
          </Box>
        ))}
        {/* {[
          'color-primary',
          'color-secondary',
          'color-dark',
          'color-contrasting',
          'color-danger',
        ].map(n => (
          <Row key={n} wrap>
            <div className={`🎏🧥🩳🎲 🎏🧥🩳🎲${n}`}>
              <span>{`--${n}`}</span>
            </div>
            {[...Array(7).keys()]
              .map(i => (
                <div className={`🎏🧥🩳🎲 🎏🧥🩳🎲${n}${i * 100 + 100}`} key={i}>
                  <span>{`--${n}-fade-${i * 100 + 100}`}</span>
                </div>
              ))
              .reverse()}
          </Row>
        ))} */}
      </div>
    </>
  );
};
export default BasicUsage;
