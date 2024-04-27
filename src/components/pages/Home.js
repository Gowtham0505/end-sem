import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import Aos from 'aos';
import 'aos/dist/aos.css';
import './style.css';
import './Boxes.css';
import { Col, Row, Container, InputGroup, FormControl, Button } from 'react-bootstrap'
import { UserAddOutlined, DollarCircleOutlined, BarChartOutlined } from '@ant-design/icons'

import food from '../images/food.jpeg';
import water from '../images/water.jpeg';
import flue from '../images/flue.jpeg';
import orphanage from '../images/orphanage.jpeg';

const Home = (props) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  // Array of objects containing information about the persons you are donating to
  const donateInfo = [
    {
      description: "Empty plates shouldn't be the norm. Donate food online to fight hunger in your community. #EndHunger",
      image: food
    },
    {
      description: "JCrystal-clear health starts with clean water. Donate online to bring safe water to those in need. Every drop counts! #WaterDonation",
      image: water
    },
    {
      description: "Flu fighters needed! Donate to research and prevention efforts to stop the flu in its tracks. #StopFlu #HealthyCommunities",
      image: flue
    },
    {
      description: "Love knows no family. Donate to orphanages and give hope to children in need. Your support provides them with food, shelter, and a brighter future. #OrphanCare #MakeADifference",
      image: orphanage
    }
  ];

  const [donationAmount, setDonationAmount] = useState(0);
  const [showMoreInfo, setShowMoreInfo] = useState(false); // State to track whether to show more info

  const handleMoreInfoClick = () => {
    setShowMoreInfo(true);
  };

  const handleDonationAmountChange = (event) => {
    setDonationAmount(event.target.value);
  };

  return (
    <div>
      {/* Project Information Section */}
      <div className="project-info" style={{ backgroundColor: "#F0F0F0", padding: "50px 0" }}>
        <Container>
          <Row>
            <Col>
              <h2>About Our Project</h2>
              <p>This project aims to provide assistance to children and individuals in need by supporting their education, healthcare, and basic necessities. Through your donations, we can make a positive impact on their lives and help them achieve their dreams.</p>
              <Button variant="primary" onClick={handleMoreInfoClick}>Learn More</Button>
            </Col>
          </Row>
          {/* Additional project information */}
          {showMoreInfo && (
            <Row style={{ marginTop: "20px" }}>
              <Col>
                <h3>Additional Information</h3>
                <p>Online donation refers to the process of giving money or goods to charitable organizations or individuals through the internet. It has become increasingly popular due to its convenience, security, and efficiency. Here's some information about online donation and its uses:</p>
                <p>Online donation platforms enable organizations to reach a global audience of potential donors. This expanded reach allows nonprofits to raise funds from supporters worldwide, increasing their fundraising capabilities and impact.</p>
              </Col>
            </Row>
          )}
        </Container>
      </div>

      {/* Existing code... */}

      <div className="normal" style={{ backgroundColor: "#FFFFFF", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="page_inner_div">
          {/* Loop over the array of donateInfo and render each person's information, image, and donate button */}
          {donateInfo.map((person, index) => (
            <div key={index} className="row" style={{ paddingTop: "70px" }}>
              <div className="col-md-6" data-aos="fade-right" data-aos-delay="100">
                <img src={person.image} alt={person.name} style={{ border: "10px solid white" }} fluid className="only" />
              </div>
              <div className="col-md-6" data-aos="fade-left" data-aos-delay="100">
                <h2>{person.name}</h2>
                <p>{person.description}</p>
                {/* Donation amount input */}
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>rs</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl type="number" placeholder="Enter amount" value={donationAmount} onChange={handleDonationAmountChange} />
                </InputGroup>
                {/* Donate button linking to donate page */}
                <Link to={{
                  pathname: "/donate",
                  state: { donationAmount: donationAmount }
                }}><Button variant="primary">Donate</Button></Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Existing code... */}
    </div>
  );
}

export default Home;
