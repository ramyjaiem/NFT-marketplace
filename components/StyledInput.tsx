import styled from 'styled-components';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
  span.ant-input-affix-wrapper-lg {
    background-color: ${(props) => props.theme.colors.black};
    border-radius: 60px;
    border: 1px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(91.38deg, #1b21ef 30.58%, #ffb800 108.54%);
    margin-bottom: 30px;
  }

  input.ant-input.ant-input-lg {
    background-color: ${(props) => props.theme.colors.black};
  }

  span.ant-input-prefix {
    color: ${(props) => props.theme.colors.grey};
  }
`;

const StyledInput = styled(Input)``;

export default function AppInput() {
  return (
    <div className="col-12 col-lg-8  col-md-6 searchbtn">
      <div className="ml-lg-2">
        <div className="searchbar">
          <input className="search_input" type="text" name="" placeholder="Search name or address" />
          <a href="#" className="search_icon d-flex justify-content-center"><img src='/search.svg' alt='serach-icon' /></a>
          <a href="#" className="search_icon float-right d-flex justify-content-center"><img src="/filter.svg" alt="" /></a>
        </div>
      </div>
    </div>
  );
}
