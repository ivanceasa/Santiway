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
import { FormattedMessage } from "react-intl";

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

									<h2 className="grid__title">
										<FormattedMessage id="advice.backpackTitle" defaultMessage="La mochila" />
									</h2>
									<div className="mt-auto">
										<span className="grid__tag">
											<FormattedMessage
												id="advice.backpack"
												defaultMessage="El peso de la mochila no debe superar el 10 o 12% de tu peso corporal (incluyendo el peso del agua). Vas a encontrar establecimientos para reabastecerte. Lo que más pesa, ¡al fondo!"
											/>

										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg2} />
								<div className="grid__body">

									<h2 className="grid__title">
										<FormattedMessage
											id="advice.shoesTitle"
											defaultMessage="¿Qué calzado llevar?"
										/>
									</h2>
									<div className="mt-auto">
										<span className="grid__tag">
											<FormattedMessage
												id="advice.shoes"
												defaultMessage="Por favor, no te compres unas botas de montaña y las estrenes en el camino. El calzado ya tiene que estar usado y adaptado a tu pie. También es recomendable llevar siempre unos calcetines de repuesto. Si el calzado es de suela dura, mucho mejor."
											/>

										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg3} />
								<div className="grid__body">

									<h2 className="grid__title">
										<FormattedMessage
											id="advice.importantTitle"
											defaultMessage="Lo más importante"
										/>
									</h2>

									<div className="mt-auto">
										<span className="grid__tag">
											<FormattedMessage
												id="advice.important"
												defaultMessage="Recuerda que realizas el camino para disfutar y no para sufrir. Por lo que si tienes que dejar parte del camino para otra ocasión, no pasa nada. ¡Mejor  llevarse un buen recuerdo!"
											/>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg4} />
								<div className="grid__body">

									<h2 className="grid__title">
										<FormattedMessage
											id="advice.companyTitle"
											defaultMessage="Mejor solo que mal acompañado"
										/>
									</h2>

									<div className="mt-auto">
										<span className="grid__tag">
											<FormattedMessage
												id="advice.company"
												defaultMessage="Lo importante es con quién vas ha hacer el camino, ya que es fundamental la buena compañía, el buen rollo y la buena convivencia. Y si vas solo, no te preocupes porque es fácil conocer a gente durante el camino."
											/>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg5} />
								<div className="grid__body">

									<h2 className="grid__title">
										<FormattedMessage id="advice.wayTitle" defaultMessage="¿Qué camino escoger?" />
									</h2>

									<div className="mt-auto">
										<span className="grid__tag">
											<FormattedMessage
												id="advice.way"
												defaultMessage="Para una primera toma de contacto con el mundo peregrino escoge el Camino Francés. Es el Camino más asequible, con gran cantidad de albergues, alojamientos y servicios. Además, tiene poca distancia entre poblaciones y buena señalización."
											/>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg6} />
								<div className="grid__body">

									<h2 className="grid__title">
										<FormattedMessage id="advice.planTitle" defaultMessage="Planifica" />
									</h2>
									<div className="mt-auto">
										<span className="grid__tag">
											<FormattedMessage
												id="advice.plan"
												defaultMessage="Planifica las etapas de forma personalizada y adaptándolas a tu esfuerzo y propio ritmo. También es muy importante organizar los sitios donde vas a pasar la noche, ya que realizar el camino de noche no es recomendable. Hacer un presupuesto, teniendo el medio de transporte que necesites para llegar y volver del camino. Lleva un pequeño botiquín"
											/>

										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="card-container">
							<div className="grid">
								<img className="photoAdvice" src={adviceImg7} />
								<div className="grid__body">

									<h2 className="grid__title">
										<FormattedMessage
											id="advice.walkTitle"
											defaultMessage="¿Cuánto andar al día?"
										/>
									</h2>

									<div className="mt-auto">
										<span className="grid__tag">
											<FormattedMessage
												id="advice.walk"
												defaultMessage="Aunque la distancia media suele ser entre 15-20km, no te obsesiones
											y disfruta el camino ¡día a día!"
											/>
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
