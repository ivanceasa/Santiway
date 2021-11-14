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
									<h1 className="grid__title">La mochila</h1>
									<div className="mt-auto">
										<span className="grid__tag">
											<ul className="list-text">
												<li>
													El peso de la mochila no debe superar el 10 o 12% de tu peso
													corporal (incluyendo el peso del agua). Vas a encontrar
													establecimientos para reabastecerte.
												</li>
												<li>Olvídate del por si acaso.</li>
												<li>Lo que más pesa, ¡al fondo!</li>
												<li>
													Organiza tu mochila con bolsas de plástico. Así te será más fácil
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
									<h1 className="grid__title">¿Qué calzado llevar?</h1>
									<div className="mt-auto">
										<span className="grid__tag">
											Por favor, no te compres unas botas de montaña y las estrenes en el camino.
											El calzado ya tiene que estar usado y adaptado a tu pie. También es
											recomendable llevar siempre unos calcetines de repuesto.
										</span>
										<h3 className="grid__title">Tip extra:</h3>
										<span>
											Si el calzado es de suela dura, mucho mejor. Las sandalias y chanclas son
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
									<h1 className="grid__title">Lo más importante</h1>
									<div className="mt-auto">
										<span className="grid__tag">
											Recuerda que realizas el camino para disfutar y no para sufrir. Por lo que
											si tienes que dejar parte del camino para otra ocasión, no pasa nada. ¡Mejor
											llevarse un buen recuerdo!
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg4} />
								<div className="grid__body">
									<h1 className="grid__title">Mejor solo que mal acompañado</h1>
									<div className="mt-auto">
										<span className="grid__tag">
											Lo importante es con quién vas ha hacer el camino, ya que es fundamental la
											buena compañía, el buen rollo y la buena convivencia. Y si vas solo, no te
											preocupes porque es fácil conocer a gente durante el camino y que acabes con
											ellos varias etapas o más... Nunca se sabe.
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg5} />
								<div className="grid__body">
									<h1 className="grid__title">¿Qué camino escoger? </h1>
									<div className="mt-auto">
										<span className="grid__tag">
											Para una primera toma de contacto con el mundo peregrino escoge el Camino
											Francés. Es el Camino más asequible, con gran cantidad de albergues,
											alojamientos y servicios, tiene poca distancia entre poblaciones, buena
											señalización, por los numerosos peregrinos que encontraremos, etc. También
											porque es el más rico en monumentos, historia y cultura (junto con el Camino
											de Le Puy). Para aquellos que ya hayan recorrido este Camino y, por lo
											tanto, tengan algo de experiencia, el número de otros Caminos interesantes
											para andar es casi ilimitado: el Camino Aragonés, el Camino del Norte, el
											Camino de la Plata, el Camino Catalán, etc.
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg6} />
								<div className="grid__body">
									<h1 className="grid__title">Planifica</h1>
									<div className="mt-auto">
										<span className="grid__tag">
											Es muy importante la planificación previa antes de empezar el camino:
											<ul className="list-text">
												<li>
													Planificar las etapas de forma personalizada y adaptándolas a tu
													esfuerzo y propio ritmo.
												</li>
												<li>
													También es muy importante organizar los sitios donde vas a pasar la
													noche, ya que realizar el camino de noche no es recomendable.
												</li>
												<li>Lo que más pesa, ¡al fondo!</li>
												<li>
													Hacer un presupuesto, teniendo el medio de transporte que necesites
													para llegar y volver del camino. Ten en cuenta el material que vas a
													necesitar para realizar el camino (botas, mochila, ropa de montaña,
													saco de dormir, etc.). La cantidad media como máximo que utiliza un
													peregrino medio puede alcanzar unos 30€ diarios. Esto irá en función
													de si comes en restaurantes o si vas al supermercado. Además,
													reserva unos 10€ más para imprevistos.
												</li>
												<li>lleva un pequeño botiquín.</li>
											</ul>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg7} />
								<div className="grid__body">
									<h1 className="grid__title">¿Cuánto tengo que andar al día?</h1>
									<div className="mt-auto">
										<span className="grid__tag">
											Aunque la distancia media suele ser entre 15-20km, no te obsesiones con la
											distancia y disfruta el camino ¡día a día!
										</span>
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
