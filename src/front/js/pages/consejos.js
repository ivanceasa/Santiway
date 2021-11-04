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
							<div className="grid">
								<img className="photoAdvice" src={adviceImg1} />
								<div className="grid__body">
									<h2 className="grid__title">La mochila</h2>
									<div className="mt-auto">
										<span className="grid__tag">
											<ul>
												<li>
													El peso de la mochila no debe superar el 10 o 12% de tu peso
													corporal (incluyendo el peso del agua). Vas a encontrar
													establecimientos para reabastecerte.
												</li>
												<li>Olvidate del por si a caso.</li>
												<li>Lo que más pesa, ¡al fondo!</li>
												<li>
													organiza tu mochila con bolsas de plástico. Así te será más fácil
													encontrar las cosas.
												</li>
											</ul>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg2} />
								<div className="grid__body">
									<h2 className="grid__title">¿Qué calzado llevar?</h2>
									<div className="mt-auto">
										<span className="grid__tag">
											Por favor, no te compres unas botas de montaña y las estrenes en el camino.
											El calzado ya tiene que estar usado y adaptado a tu pie. También es
											recomendable llevar siempre unos calcetines de repuesto.
										</span>
										<h3>Tip extra:</h3>
										<span>
											Si el calzado es de suela dura, mucho mejor. Las sandalias o chanclas son
											para la playa.
										</span>
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
									<h2 className="grid__title">Mejor solo que mal acompañado</h2>
									<div className="mt-auto">
										<span className="grid__tag">
											Lo importante es con quién vas ha hacer el camino, por lo que es fundamental
											la buena compañía y el buen rollo y con el que tengas buena convivencia. Por
											lo que si no tienes a nadie así o prefieres hacerlo solo. Ni te preocupes.
											Es fácil conocer a gente durante el camino y que acabes con ellos varias
											etapas o más... Nunca se sabe.
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg5} />
								<div className="grid__body">
									<h2 className="grid__title">¿Qué camino escoger? </h2>
									<div className="mt-auto">
										<span className="grid__tag" />
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
									<h2 className="grid__title">¿Cuanto tengo que andar al día?</h2>
									<div className="mt-auto">
										<span className="grid__tag">
											Aunque la distancia media suele ser entre 15-20km, o te obsesiones con la
											distancia y disfruta el camino ¡día a día!
										</span>
									</div>
								</div>
							</div>
						</div>
						{/* <div className="card-container">
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
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Consejos;
