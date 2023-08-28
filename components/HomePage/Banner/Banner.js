import Image from 'next/image';
import { Carousel } from 'react-bootstrap';

const Banner = () => {
    return (
        <div>

            <Carousel>
                <Carousel.Item>
                    <div style={{ width: '100%', height: 'auto', position: 'relative' }}>
                        <Image
                            className="d-block "
                            alt='Mountains'
                            src="/images/banner.png"
                            width={500}
                            height={500}
                            layout="responsive"
                            loading="eager"
                        />
                    </div>

                </Carousel.Item>
                <Carousel.Item>
                    <div style={{ width: '100%', height: 'auto', position: 'relative' }}>
                        <Image
                            className="d-block "
                            alt='Mountains'
                            src="/images/banner2.png"
                            width={500}
                            height={500}
                            layout="responsive"
                            loading="eager"
                        />
                    </div>

                </Carousel.Item>
                <Carousel.Item>
                    <div style={{ width: '100%', height: 'auto', position: 'relative' }}>
                        <Image
                            className="d-block "
                            alt='Mountains'
                            src="/images/banner3.png"
                            width={500}
                            height={500}
                            layout="responsive"
                            objectFit="contain"
                            loading="eager"
                        />
                    </div>

                </Carousel.Item>
                <Carousel.Item>
                    <div style={{ width: '100%', height: 'auto', position: 'relative' }}>
                        <Image
                            className="d-block "
                            alt='Mountains'
                            src="/images/banner4.png"
                            width={500}
                            height={500}
                            layout="responsive"
                            objectFit="contain"
                            loading="eager"
                        />
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Banner;