import { Col, Divider, Row } from "antd";

const style = {
  // background: '#0092ff',
  // padding: '8px 0',
};

export default function Footer() {
  return (
    <div className="bg-black p-5 text-white">
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <div className="sm:col-span-3 lg:col-span-1 flex sm:justify-center lg:justify-start items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <p className="font-bold font-nunito text-lg">About us</p>
            <ul>
              <li>
                {" "}
                <a
                  className="text-gray-600 hover:text-gray-800 text-sm group relative mt-2"
                  href="#"
                >
                  {" "}
                  About us
                </a>
              </li>
              <li>
                {" "}
                <a
                  className="text-gray-600 hover:text-gray-800 text-sm group relative mt-2"
                  href="#"
                >
                  {" "}
                  Newsroom
                </a>
              </li>
              <li>
                {" "}
                <a
                  className="text-gray-600 hover:text-gray-800 text-sm group relative mt-2"
                  href="#"
                >
                  {" "}
                  Careers
                </a>
              </li>
              <li>
                {" "}
                <a
                  className="text-gray-600 hover:text-gray-800 text-sm group relative mt-2"
                  href="#"
                >
                  {" "}
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <p className="font-bold font-nunito text-lg">Help & FAQ</p>
            <ul>
              <li>
                {" "}
                <a
                  className="text-gray-600 hover:text-gray-800 text-sm group mt-20"
                  href="#"
                >
                  {" "}
                  Online ordering
                </a>
              </li>
              <li>
                {" "}
                <a
                  className="text-gray-600 hover:text-gray-800 text-sm group relative mt-2"
                  href="#"
                >
                  {" "}
                  Shipping
                </a>
              </li>
              <li>
                {" "}
                <a
                  className="text-gray-600 hover:text-gray-800 text-sm group relative mt-2"
                  href="#"
                >
                  {" "}
                  Billing
                </a>
              </li>
              <li>
                {" "}
                <a
                  className="text-gray-600 hover:text-gray-800 text-sm group relative mt-2"
                  href="#"
                >
                  {" "}
                  Return & exchanges
                </a>
              </li>
            </ul>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            {" "}
            <p className="font-bold font-nunito text-lg">Account</p>
            <ul>
              <li>
                {" "}
                <a
                  className="text-gray-600 hover:text-gray-800 text-sm group relative mt-2"
                  href="#"
                >
                  {" "}
                  Order Status
                </a>
              </li>
              <li>
                {" "}
                <a
                  className="text-gray-600 hover:text-gray-800 text-sm group relative mt-2"
                  href="#"
                >
                  {" "}
                  Favourites
                </a>
              </li>
              <li>
                {" "}
                <a
                  className="text-gray-600 hover:text-gray-800 text-sm group relative mt-2"
                  href="#"
                >
                  {" "}
                  My account
                </a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
}
