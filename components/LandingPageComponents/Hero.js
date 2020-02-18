import { Button, Icon, Input, Row, Col } from 'antd'
import Router from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { H1, H4 } from '../VTheme/VTheme'

const Search = Input.Search

// this is the big container block that holds the container together lol
const AwesomeHeroContainer = styled.div`
  margin: auto;
  margin-top: 0;
  height: auto;
  width: 100%;

  @media screen and (min-width: 768px) {
    margin-top: 5rem;
    padding: 2rem;
  }

  @media screen and (min-width: 1200px) {
    width: 80rem;
  }
`
// start left hand video side
const HeroLeft = styled.div`
  margin-top: 0rem;
  margin-left: 0rem;
  width: 100%;
  height: 25rem;
  border-radius: 0;

  @media screen and (min-width: 768px) {
    position: relative;
    //margin-top: 7rem;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`


const AwesomeImage = styled.img`
  position: relative;
  text-align: center;
  margin: 0 auto;
  width:100%;
  height: 100%;
  overflow: hidden;
  object-fit: cover;
  background-color: white;

  @media screen and (max-width: 768px) {
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
`
// end left hand video side

// start right hand copy + search + button side

const HeroRight = styled.div`
  color: #ffffff;
  padding: 1rem;

  @media screen and (min-width: 768px) {
    margin: 15% 0;
    padding-left: 3rem;
  }

  @media screen and (min-width: 998px) {
    margin: 20% 0;
  }

  @media screen and (min-width: 1200px) {
    margin: 25% 0;
  }
`
const SearchBox = styled.div`
  background-color: white;
  height: 4rem;
  margin-top: 1rem;
  border-radius: 0.25rem;
  padding: 8px;
  box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, 0.5);

  .ant-input-affix-wrapper .ant-input:not(:first-child) {
    padding-left: 40px;
  }
`

// end right hand copy and CTA side

const handleSearch = search => {
  Router.push({
    pathname: '/search',
    query: {
      search
    }
  })
}

// begin actual component
const Hero = ({ ...props }) => (
  <AwesomeHeroContainer>
    <Row>
      <Col md={8}>
        <HeroLeft>
       
          <AwesomeImage
            src='/static/img/hero.png'
            
          />
           
        </HeroLeft>
      </Col>
      <Col md={16}>
        <HeroRight>
          <H1>volunteer yo—self.</H1>
          <H4>
            Find awesome ways to volunteer your skills.
            <br />
            Help your community do epic things.
          </H4>
          <SearchBox>
            <Search
              placeholder="try 'building robots'"
              prefix={<Icon type='search' style={{ color: 'rgba(0,0,0,.25)' }} />}
              enterButton='Search'
              size='large'
              // eslint-disable-next-line no-console
              onSearch={handleSearch}
            />
          </SearchBox>
          <br />
          <br />
          <Button type='secondary' shape='round' size='large' href='/about'>
            Learn more
          </Button>
        </HeroRight>
      </Col>
    </Row>
  </AwesomeHeroContainer>
)
// LAUNCH IT. WOOOSH!
export default Hero
