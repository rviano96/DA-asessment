import styled from 'styled-components'

interface ILoadingProps {
  border: number;
  size: number;
  time: number;
}

export const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-top: auto;
    margin-bottom: auto;
`

export const Loading = styled.div<ILoadingProps>`
  border: ${(prop: any) => `${prop.border}px solid #0000008a`};
  border-top: ${(prop: any) => `${prop.border}px  #DFDFDF  solid`};
  border-radius: 50%;
  height: ${(prop: any) => `${prop.size}px`};
  width: ${(prop: any) => `${prop.size}px`};
  animation: ${(prop: any) => `spin ${prop.time}s linear infinite`};
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;