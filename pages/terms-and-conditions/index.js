import React from 'react';
import Layout from '../../components/Layout';
import Footer from '../../components/Shared/Footer/Footer';

const index = () => {
    return (
        <Layout>
            <div className="container">
                <div style={containerStyle}>
                    <h1 style={headerStyle}>Bangladesh Mart User Agreement</h1>
                    <p>Welcome to Bangladesh Mart! This User Agreement ("Agreement") outlines the terms and conditions governing your use of our online marketplace platform ("Platform") and the services we offer (collectively, the "Services").</p>

                    <p style={sectionTitleStyle}>1. Your Account</p>
                    <p>You may register for an account to enjoy a more personalized shopping experience on the Platform. You are responsible for maintaining the confidentiality of your account information, including your password, and for all activity that occurs under your account. You agree to notify Bangladesh Mart immediately of any unauthorized use of your account or any other security breach. Bangladesh Mart will not be liable for any loss or damage arising from your failure to comply with these security obligations.</p>

                    <p style={sectionTitleStyle}>2. Placing Orders and Payment</p>
                    <p>When you place an order on the Platform, you are offering to purchase a product from a third-party seller ("Seller") at the listed price. All orders are subject to availability and confirmation by the Seller. Bangladesh Mart acts as a facilitator between you and the Seller and does not hold inventory itself. Bangladesh Mart reserves the right to refuse or cancel any order for any reason, including but not limited to:</p>
                    <ul className="list-group">
                        <li className="list-group-item">Seller's inability to fulfill the order</li>
                        <li className="list-group-item">Errors in product or pricing information</li>
                        <li className="list-group-item">Payment issues</li>
                        <li className="list-group-item">Suspected fraudulent activity</li>
                    </ul>
                    <p><strong>Payment terms:</strong></p>
                    <ul>
                        <li>We accept the following payment methods: [List your accepted payment methods here]</li>
                        <li>Payment will be processed securely before your order is confirmed.</li>
                        <li>Prices are displayed in [Your currency] and are inclusive of VAT if applicable.</li>
                    </ul>

                    <p style={sectionTitleStyle}>3. Delivery and Returns</p>
                    <p>Each Seller is responsible for fulfilling and shipping orders they receive through the Platform. Delivery timelines and shipping costs will vary depending on the Seller and your chosen delivery method. You can find specific delivery information on the product page or during checkout.</p>
                    <p><strong>Returns and Refunds:</strong></p>
                    <ul>
                        <li>Each Seller has their own return and refund policy. You can find the specific policy for a product on the product page or by contacting the Seller directly.</li>
                        <li>Bangladesh Mart may assist with facilitating communication between you and the Seller in case of return or refund issues.</li>
                    </ul>

                    <p style={sectionTitleStyle}>4. User Content and Conduct</p>
                    <p>You may be able to submit reviews, ratings, and other content ("User Content") to the Platform. You represent and warrant that you own all rights to the User Content you submit and that the User Content does not infringe on the intellectual property rights of any third party. You agree not to submit any User Content that is illegal, obscene, threatening, defamatory, harassing, or otherwise violates this Agreement.</p>

                    <p style={sectionTitleStyle}>5. Intellectual Property</p>
                    <p>The content of the Platform, including but not limited to text, graphics, logos, images, and software, is the property of Bangladesh Mart or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, modify, distribute, or commercially exploit any of the content without the express written permission of Bangladesh Mart.</p>

                    <p style={sectionTitleStyle}>6. Disclaimer</p>
                    <p>The Platform and the Services are provided "as is" and without warranties of any kind, whether express or implied. Bangladesh Mart disclaims all warranties, including but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. Bangladesh Mart does not warrant that the Platform or the Services will be uninterrupted, error-free, or virus-free.</p>

                    <p style={sectionTitleStyle}>7. Limitation of Liability</p>
                    <p>Bangladesh Mart shall not be liable for any damages arising from your use of the Platform or the Services, including but not limited to, direct, indirect, incidental, consequential, or punitive damages. Bangladesh Mart is not responsible for the actions or omissions of Sellers on the Platform.</p>

                    <p style={sectionTitleStyle}>8. Governing Law</p>
                    <p>This Agreement shall be governed by and construed in accordance with the laws of the People's Republic of Bangladesh.</p>

                    <p style={sectionTitleStyle}>9. Dispute Resolution</p>
                    <p>Any dispute arising out of or relating to this Agreement shall be resolved by binding arbitration in accordance with the Arbitration Rules of the Bangladesh National Arbitration Council (BNAC). The arbitration shall be conducted in Dhaka, Bangladesh.</p>

                    <p style={sectionTitleStyle}>10. Entire Agreement</p>
                    <p>This Agreement constitutes the entire agreement between you and Bangladesh Mart regarding your use of the Platform and the Services.</p>

                    <p style={sectionTitleStyle}>11. Changes to User Agreement</p>
                    <p>Bangladesh Mart reserves the right to change this Agreement at any time. The revised Agreement will be effective immediately upon posting on the Platform. You are advised to review the Agreement periodically for any changes. Your continued use of the Platform following the posting of a revised Agreement will be deemed your acceptance of the revised Agreement.</p>

                    <p style={sectionTitleStyle}>12. Contact Us</p>
                    <ul>
                        <li><strong>Email:</strong> contact@bangladeshmart.com.bd</li>
                        <li><strong>Phone:</strong> +8801840101010</li>
                        <li><strong>Address:</strong> Dhaka, Bangladesh</li>
                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </Layout>
    );
};

const containerStyle = {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
}

const headerStyle = {
    textAlign: 'center',
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
}

const sectionTitleStyle = {
    fontWeight: 'bold',
    marginTop: '20px',
}


export default index;