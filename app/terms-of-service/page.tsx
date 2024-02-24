"use client";

import React from 'react';
import { H1, Wrapper } from './page.styled';

const TermsOfServicePage: React.FC = () => {
    return (
        <Wrapper>
            <H1>Terms of Service</H1>
            <p>Welcome to our website. These terms and conditions outline the rules and regulations for the use of our website.</p>
            
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use our website if you do not accept all of the terms and conditions stated on this page.</p>
            
            <h2>2. Intellectual Property Rights</h2>
            <p>All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms and conditions.</p>
            
            <h2>3. Restrictions</h2>
            <p>You are specifically restricted from all of the following:</p>
            <ul>
                <li>publishing any website material in any other media;</li>
                <li>selling, sublicensing and/or otherwise commercializing any website material;</li>
                <li>publicly performing and/or showing any website material;</li>
                <li>using this website in any way that is or may be damaging to this website;</li>
                <li>using this website in any way that impacts user access to this website;</li>
                <li>using this website contrary to applicable laws and regulations, or in any way may cause harm to the website, or to any person or business entity;</li>
                <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this website;</li>
                <li>using this website to engage in any advertising or marketing.</li>
            </ul>
            
            <h2>4. Limitation of Liability</h2>
            <p>In no event shall we be liable for any damages arising out of the use or inability to use our website.</p>
            
            <h2>5. Indemnification</h2>
            <p>You hereby indemnify to the fullest extent from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these terms.</p>
            
            <h2>6. Severability</h2>
            <p>If any provision of these terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>
            
            <h2>7. Variation of Terms</h2>
            <p>We are permitted to revise these terms at any time as it sees fit, and by using this website you are expected to review these terms on a regular basis.</p>
            
            <h2>8. Governing Law & Jurisdiction</h2>
            <p>These terms will be governed by and construed in accordance with the laws of [your country], and you submit to the non-exclusive jurisdiction of the state and federal courts located in [your country] for the resolution of any disputes.</p>
        </Wrapper>
    );
};

export default TermsOfServicePage;