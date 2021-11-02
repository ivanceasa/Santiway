import React from "react";
import { Link } from "react-router-dom";
import "../../styles/consejos.scss";
import adviceImg1 from "../../img/imgAdvice/alice-donovan-rouse-199230-unsplash-1296x1024.jpg";
import adviceImg2 from "../../img/imgAdvice/calzado-ideal-camino-santiago.jpg";
import adviceImg3 from "../../img/imgAdvice/como-preparar-camino-santiago-1024x819.jpg";
import adviceImg4 from "../../img/imgAdvice/espíritu-del-peregrino-albergue-milpés-arzúa.jpg";
import adviceImg5 from "../../img/imgAdvice/compass-orientation-tourism-journey.jpg";
import adviceImg6 from "../../img/imgAdvice/flat-lay-office-feature.jpg";
import adviceImg7 from "../../img/imgAdvice/como-preparar-camino-santiago.jpg";

const Consejos = () => {
	return (
		<div id="advices">
			<div className="container">
				<div className="row">
					<div className="card-columns">
						<div className="card-container">
							<div className="card">
								<img className="photoAdvice" src={adviceImg1} />
								<div className="grid__body">
									<h2 className="grid__title">Title 1</h2>
									<div className="mt-auto">
										<span className="grid__tag">#tag1</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg2} />
								<div className="grid__body">
									<h2 className="grid__title">Title 2</h2>
									<div className="mt-auto">
										<span className="grid__tag">#tag2</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg3} />
								<div className="grid__body">
									<h2 className="grid__title">Title 3</h2>
									<div className="mt-auto">
										<span className="grid__tag">#tag3</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg4} />
								<div className="grid__body">
									<h2 className="grid__title">Title4</h2>
									<div className="mt-auto">
										<span className="grid__tag">#tag4</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg5} />
								<div className="grid__body">
									<h2 className="grid__title">Title 5 </h2>
									<div className="mt-auto">
										<span className="grid__tag">#tag5</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg6} />
								<div className="grid__body">
									<h2 className="grid__title">Title 6</h2>
									<div className="mt-auto">
										<span className="grid__tag">#tag6</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg7} />
								<div className="grid__body">
									<h2 className="grid__title">Title 7</h2>
									<div className="mt-auto">
										<span className="grid__tag">#tag7</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Consejos;
